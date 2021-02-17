string = input("Input a string: ")

digits = 0
alphas = 0

for char in string:
    if char.isdigit():
        digits += 1
    elif char.isalpha():
        alphas += 1
    else:
        pass

print("Digits", digits)
print("Letters", alphas)
