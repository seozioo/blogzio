pipeline {
    agent any

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
            steps {
                withCredentials([file(credentialsId: 'env_blogzio', variable: 'ENV_FILE')]) {
                    sh '''
                        cp "${ENV_FILE}" .env
                    '''
                }
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
