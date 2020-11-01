#!/bin/bash

rm -rf android/app/build/*
rm -f package-loke.json
npm install
npx react-native run-android