def divider(s):
    if len(s) % 2 == 1:
            a = s[:int(len(s)/2)+1]
            b = s[int(len(s)/2)+1:]
    elif len(s) % 2 == 0:
        a = s[:int(len(s)/2)]
        b = s[int(len(s)/2):]
    else:
        return

    return [a, b]

def connector(s1, s2=None):
    if s2 == None:
        return [divider(s1)[0], divider(s1)[1]]
    else:
        return [
            divider(s1)[0] + divider(s2)[0],
            divider(s1)[1] + divider(s2)[1]
        ]

print(connector('abcde'))
print(connector('abcde', 'jklm'))
