from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
import serial

from ledctrl import build_serial_commands
from urllib.parse import parse_qs
import threading
import queue
import logging

command_queue = queue.Queue()

def serial_thread(port):
    try:
        with serial.Serial(port, 9600, timeout=1) as ser:
            while True:
                # Check for available data to read
                if ser.in_waiting > 0:
                    response = ser.readline().decode().strip()
                    logging.info(f'SERIAL< {response}')

                # Check for queued commands
                if not command_queue.empty():
                    command = command_queue.get()
                    logging.info(f'SERIAL> {command}')
                    ser.write(command.encode())
    except Exception as e:
        logging.error(f'Error in serial thread: {e}')

# Start the serial thread
puerto = "/dev/ttyUSB0"

threading.Thread(target=serial_thread, args=(puerto,), daemon=True).start()


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query = self.path.split('?')[1] if '?' in self.path else ''
        params = parse_qs(query)
        params = {k: v[0] for k, v in params.items()}  # Convert lists to single values

        print(f"Received GET request with params: {params}")

        turn_on_pin = int(params.get('led_number'))
        turn_on_value = int(params.get('led_intensity'))

        cadena = build_serial_commands(turn_on_pin, turn_on_value)
        command_queue.put(cadena)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")


def run(server_class=HTTPServer, handler_class=RequestHandler, port=8080):
    server_address = ('', port)
    # Set up logging
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

    httpd = server_class(server_address, handler_class)
    print(f'Starting http server on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()