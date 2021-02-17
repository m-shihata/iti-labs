'''
 Determine if School_bus is also an instance of the Vehicle class
'''

class Vehicle:
    def __init__(self, name, mileage, capacity):
        self.name = name
        self.mileage = mileage
        self.capacity = capacity


class Bus(Vehicle):
    pass


school_bus = Bus("School Volvo", 12, 50)
print(isinstance(school_bus, Vehicle)) # <- True