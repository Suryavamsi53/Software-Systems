#!/usr/bin/env python3
import http.server
import socketserver
import socket
import os

START_PORT = 8000

def get_local_ip():
    try:
        # Create a dummy socket to connect to an external IP (doesn't actually connect)
        # This figures out which network interface is used for the LAN
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

Handler = http.server.SimpleHTTPRequestHandler

# Allow address reuse to prevent "Address already in use" errors on restart
socketserver.TCPServer.allow_reuse_address = True

port = START_PORT
while port < START_PORT + 100:
    try:
        with socketserver.TCPServer(("0.0.0.0", port), Handler) as httpd:
            local_ip = get_local_ip()
            print("\n" + "="*60)
            print(f"🚀 Server Started Successfully!")
            print(f"📂 Serving: {os.getcwd()}")
            print("="*60)
            print(f"💻 On this computer:  http://localhost:{port}")
            print(f"📱 On your mobile:    http://{local_ip}:{port}")
            print("="*60)
            print("Press Ctrl+C to stop the server\n")
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped.")
            break
    except OSError as e:
        if e.errno == 98: # Address already in use
            print(f"⚠️  Port {port} is busy, trying {port + 1}...")
            port += 1
        else:
            raise e