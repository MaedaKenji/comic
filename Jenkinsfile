pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Mengambil kode terbaru dari GitHub...'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Database Migration') {
            steps {
                echo 'Menjalankan migrasi database...'
                // Flag --force wajib digunakan agar Laravel tidak meminta konfirmasi (yes/no) di Jenkins
                sh 'php artisan migrate --force'
            }
        }

        stage('Simulasi Test') {
            steps {
                echo 'Menjalankan unit testing...'
            }
        }

        stage('Simulasi Build') {
            steps {
                sh 'npm run build'
                echo 'Aplikasi berhasil di-build dan siap di-deploy!'
            }
        }

        

        stage('Deploy to Localhost') {
            steps {
                echo 'Menghentikan container lama jika ada...'
                // Menghindari error port bentrok saat deploy ulang
                sh 'docker stop comic-reader-app || true'
                sh 'docker rm comic-reader-app || true'

                echo 'Membangun Docker Image baru...'
                sh 'docker build -t comic-reader:latest .'

                echo 'Menjalankan webapp di localhost port 3000...'
                sh 'docker run -d -p 3000:3000 --name comic-reader-app comic-reader:latest'

                echo 'Aplikasi berhasil di-deploy! Silakan buka http://localhost:3000'
            }
        }
    }
}
