pipeline {
    agent any

    parameters {
        string(name: 'POSTGRES_HOST', defaultValue: 'postgres', description: 'PostgreSQL 호스트')
        string(name: 'POSTGRES_PORT', defaultValue: '5432', description: 'PostgreSQL 포트')
        string(name: 'POSTGRES_DB', defaultValue: 'blogzio', description: 'PostgreSQL DB 이름')
        string(name: 'POSTGRES_USER', defaultValue: 'blogzio', description: 'PostgreSQL 유저')
        password(name: 'POSTGRES_PASSWORD', defaultValue: '', description: 'PostgreSQL 비밀번호')
        string(name: 'AWS_ACCESS_KEY', defaultValue: '', description: 'AWS/MinIO Access Key')
        password(name: 'AWS_SECRET_KEY', defaultValue: '', description: 'AWS/MinIO Secret Key')
        string(name: 'AWS_S3_ENDPOINT', defaultValue: '', description: 'S3 엔드포인트')
        string(name: 'AWS_REGION', defaultValue: 'ap-northeast-2', description: 'AWS 리전')
        string(name: 'AWS_S3_BUCKET', defaultValue: '', description: 'S3 버킷 이름')
        password(name: 'JWT_SECRET', defaultValue: '', description: 'JWT 시크릿')
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose -p blogzio build'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    cat > .env << EOF
POSTGRES_HOST=${POSTGRES_HOST}
POSTGRES_PORT=${POSTGRES_PORT}
POSTGRES_DB=${POSTGRES_DB}
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
AWS_SECRET_KEY=${AWS_SECRET_KEY}
AWS_S3_ENDPOINT=${AWS_S3_ENDPOINT}
AWS_REGION=${AWS_REGION}
AWS_S3_BUCKET=${AWS_S3_BUCKET}
JWT_SECRET=${JWT_SECRET}
EOF
                '''
                sh 'docker compose -p blogzio down'
                sh 'docker compose -p blogzio up -d'
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
