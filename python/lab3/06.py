# Write a Python class which has two methods get_String and print_String.
# get_String accept a string from the user
# print_String print the string in upper case


class IOString:
    def __init__(self):
        self.str = ""

    def get_string(self):
        self.str = input("Please, Enter a string...\n")

    def print_string(self):
        print(self.str.upper())


io = IOString()
io.get_string()
io.print_string()
