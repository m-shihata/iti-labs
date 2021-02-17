'''
Write a Python class to find validity of a string of parentheses,
'(', ')', '{', '}', '[' and ']'. 
These brackets must be close in the correct order, 
for example:
'()' and '()[]{}' are valid but '[)', '({[)]' and '{{{' are invalid
'''


class ParanthesesValidator:
    open_list = ['(', '[', '{']
    close_list = [')', ']', '}']

    def __init__(self, string):
        self.string = string
        self.picker = []

    def check(self):
        for i in self.string:
            if i in self.open_list or i in self.close_list:
                self.picker.append(f'{i}')

        if len(self.picker) % 2 != 0:
            return False

        for i in range(len(self.picker)):
            if self.picker[i] in self.close_list:
                index = self.close_list.index(self.picker[i])
                self.picker[i] = self.open_list[index]

        for i in range(0, len(self.picker), 2):
            if self.picker[i] != self.picker[i+1]:
                return False

        return True


pv1 = ParanthesesValidator("()[]{}")
pv2 = ParanthesesValidator('({[)]')
print(pv1.check())  # <- True
print(pv2.check())  # <- False
