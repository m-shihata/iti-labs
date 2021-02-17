'''
Define a class Person and its two child classes: Male and Female. 
All classes have amethod "getGender" which can print "Male" for Male class 
and "Female" for Femaleclass.
'''

class Person:
    def get_gender(self):
        pass

class Male(Person):
    def get_gender(self):
        print('Male')

class Female(Person):
    def get_gender(slef):
        print('Female')

p = Person()
m = Male()
f = Female()

print(p.get_gender(), m.get_gender(), f.get_gender())
