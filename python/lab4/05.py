'''
Define a class which has at least two methods:
    getString: to get a string from console input
    printString: to print the string in upper case.
'''

class IOString:
    def __init__(self):
        self.string = None

    def get_string(self):
        self.string = input("Enter a string: ")

    def print_string(self):
        print(self.string)

obj = IOString()
obj.get_string()
obj.print_string()
