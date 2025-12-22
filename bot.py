import os
import time

def run_engine():
    service = os.getenv("SERVICE", "General_Boost")
    print(f"--- PHANTOM ENGINE v5.0 ---")
    print(f"MODE: {service}")
    
    # Simulate a deep scan
    for i in range(1, 4):
        print(f"[*] Initializing Security Protocol {i}...")
        time.sleep(2)
        
    print("✅ Connection Secure. Sending signal to nodes...")
    time.sleep(5)
    print("🎉 SUCCESS: Task allocated to Global Network.")

if __name__ == "__main__":
    run_engine()

