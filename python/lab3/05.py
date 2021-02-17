# Write a Python program to reverse a string word by word

def string_mirror(s):
    result = ""
    splitted = s.split()
    reversed = splitted[::-1]
    for word in reversed:
        result += word + ' '
    return result


print(string_mirror("One Two Three"))
