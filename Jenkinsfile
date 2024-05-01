pipeline {
  agent any
  stages {
    stage('Checkout Code / Git') {
      steps {
        git(url: 'https://github.com/botirkhuja/ddns-namecheap-client', branch: 'main')
      }
    }

    stage('List items') {
      parallel {
        stage('List items') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Build DDNS') {
          steps {
            sh 'docker build -t namecheap-ddns .'
          }
        }

      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t ddns .'
      }
    }

  }
}