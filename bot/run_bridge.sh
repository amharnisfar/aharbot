#!/bin/bash
while true; do
  echo "Starting WhatsApp Bridge..."
  node whatsapp_bridge.js
  echo "WhatsApp Bridge crashed or exited. Restarting in 5 seconds..."
  sleep 5
done
