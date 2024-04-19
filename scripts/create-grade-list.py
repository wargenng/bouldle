grades = ["V-easy"]
for i in range(17):
    grades.append("V" + str(i) + "-")
    grades.append("V" + str(i))
    grades.append("V" + str(i) + "+")
    grades.append("V" + str(i) + "-" + str(i+1))

grades.append("V17-")
grades.append("V17")

print(grades)

