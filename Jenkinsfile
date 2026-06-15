pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Mengambil kode terbaru dari GitHub...'
                // Biasanya stage ini otomatis diclone oleh Jenkins jika pakai Multibranch/Webhook
            }
        }

        stage('Prepare Environment') {
            steps {
                echo 'Menyiapkan file .env untuk Docker Build...'
                // Membuat file .env jika belum ada
                sh 'cp -n .env.example .env || true'
                
                // Set agar Laravel tahu kita menggunakan disk S3 (MinIO)
                // Kita bisa inject konfigurasi lewat sed atau menggunakan .env yang sudah matang
                echo 'Environment siap.'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Menghentikan container lama jika ada...'
                sh 'docker stop comic-reader-app || true'
                sh 'docker rm comic-reader-app || true'

                echo 'Membangun Docker Image (Proses install & build terjadi di dalam sini)...'
                sh 'docker build -t comic-reader:latest .'

                echo 'Menjalankan webapp di localhost port 3000...'
                // Kita hubungkan sekalian dengan network database & minio kamu jika diperlukan
                sh 'docker run -d -p 3000:8000 --name comic-reader-app comic-reader:latest'

                echo 'Aplikasi berhasil di-deploy di dalam container!'
            }
        }

        stage('Database Migration & Seed') {
            steps {
                echo 'Menjalankan migrasi di dalam container yang baru menyala...'
                // Perintah artisan dieksekusi dari LUAR masuk ke DALAM container yang sedang running
                sh 'docker exec comic-reader-app php artisan key:generate --force'
                sh 'docker exec comic-reader-app php artisan migrate --force'
                sh 'docker exec comic-reader-app php artisan db:seed --force'
            }
        }
    }
}