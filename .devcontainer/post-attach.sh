#! /bin/bash

# context を設定
kubectl config set-context hatena-intern-2025 --cluster=minikube --user=minikube --namespace=hatena-intern-2025
kubectl config use-context hatena-intern-2025
