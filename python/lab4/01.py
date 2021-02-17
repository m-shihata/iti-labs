# Define a class attribute”color” with a default value white. I.e., Every Vehicle should bewhite.

class Vehicle:
    color = "White" # <- Solution

    def __init__(self, name, max_speed, mileage):
        self.name = name
        self.max_speed = max_speed
        self.mileage = mileage


class Bus(Vehicle):
    pass


class Car(Vehicle):
    pass
