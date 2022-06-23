#!/bin/bash

yarn start &

METRO_BUNDLER_PID=$!

yarn test:e2e-android-dev-debug --headless --debug-synchronization 500

DETOX_EXIT_CODE=$?

kill $METRO_BUNDLER_PID

exit $DETOX_EXIT_CODE