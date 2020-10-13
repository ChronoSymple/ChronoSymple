#!/bin/bash

rm -rf android/app/build/*
npm clean-install
npx react-native run-android