# Given two points represented as x1, y1, x2, y2,
# r the (float)return (float) distance between

import math


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


p1 = Point(0, 0)
p2 = Point(3, 4)

distance = math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2)
print(distance)
