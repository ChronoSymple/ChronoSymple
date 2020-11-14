#!/bin/bash

rm -rf android/app/build/*
rm -rf node_modules/*
rm -f package-loke.json
rm -rf node_modules/*
npm cache verify
npm install --no-optional
npm audit fix
npx react-native run-android
