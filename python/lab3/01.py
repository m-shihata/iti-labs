# The program takes a command line argument,
# this argument is the name of a text file.
# the program reads all the text and split them
# and calulate the 20 most used workds in the file

import sys
import operator

if len(sys.argv) != 2:
    print("Usage: python 01.py file.txt")
    sys.exit(1)

counter = {}

f1 = open(sys.argv[1], "r")
content = f1.read()
words = content.split()

for word in words:
    if word in counter.keys():
        counter.update({word: counter[word] + 1})
    else:
        counter.update({word: 1})

sorted_dict = dict(sorted(
    counter.items(),
    key=operator.itemgetter(1),
    reverse=True)
)

the_words = list(sorted_dict.keys())[:20]

f2 = open(f"{sys.argv[1][0:-4]}_popular_words.txt", "a")

for word in the_words:
    f2.write(f"{word} - {counter[word]}\n")

f2.close()
sys.exit(0)
