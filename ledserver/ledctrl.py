
def build_serial_commands(turn_on_pin, turn_on_value):
    if turn_on_pin == 0:
    # If the pin is 0, set to demo mode
        cadena = "0 0\n"
    else:
    # Build the string to send to the serial port
        cadena = ""
        for i in range(2, 14):
            if i == turn_on_pin:
                cadena += f"{i} {turn_on_value}\n"
            else:
                cadena += f"{i} 0\n"
    return cadena
