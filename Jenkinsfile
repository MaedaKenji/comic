pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Mengambil kode terbaru dari GitHub...'
            }
        }

        stage('Prepare Environment') {
            steps {
                echo 'Menyiapkan file .env untuk Docker Build...'
                sh 'cp -n .env.example .env || true'
                echo 'Environment siap.'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Menghentikan container lama jika ada...'
                sh 'docker stop comic-reader-app || true'
                sh 'docker rm comic-reader-app || true'

                echo 'Membangun Docker Image (Proses install & build terjadi di dalam sini)...'
                sh 'docker build -t comic:latest .'

                echo 'Menjalankan webapp di localhost port 8001...'
                sh 'docker run -d -p 8001:80 -e SERVER_NAME=:80 -e DB_HOST=host.docker.internal --add-host=host.docker.internal:host-gateway --name comic-reader-app comic:latest'

                echo 'Aplikasi berhasil di-deploy di dalam container!'
            }
        }

        stage('Database Migration & Seed') {
            steps {
                echo 'Menjalankan migrasi di dalam container yang baru menyala...'
                sh 'docker exec comic-reader-app php artisan key:generate --force'
                sh 'docker exec comic-reader-app php artisan migrate --force'
                sh 'docker exec comic-reader-app php artisan db:seed --force'
            }
        }
    }
}