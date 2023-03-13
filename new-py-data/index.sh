#!/bin/sh

source ~/.zshrc

FOLDER_NAME="$(date +%y%m%d) $1"

echo $FOLDER_NAME

mkdir -p "$FOLDER_NAME"

cd "$FOLDER_NAME"

x devcon py-data

mkdir -p one/in one/out

cat > one/one.ipynb << 'EOF'
{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  },
  "orig_nbformat": 4
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
EOF

code .