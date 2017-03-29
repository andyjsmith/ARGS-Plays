from pykeyboard import PyKeyboard
import uinput, time, datetime, sys

args = sys.argv
k = PyKeyboard()

def pressKey(key):
	k.press_key(key)
	time.sleep(0.1)
	k.release_key(key)

def main():
    pressKey(args[1])

if __name__ == "__main__":
    main()
