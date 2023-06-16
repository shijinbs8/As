from django.db import models


# Create your models here.




class Bus_Students(models.Model):
    stud_name=models.CharField(max_length=100)
    images=models.ImageField(upload_to='pics')
    getin=models.IntegerField()
    pls=models.CharField(max_length=100)


    def __str__(self):
        return self.stud_name


class Student(models.Model):
    name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=100)
    roll_number = models.IntegerField()

    def __str__(self):
        return self.name

class Students(models.Model):
    Name=models.CharField(max_length=100)
    Reg_No=models.IntegerField()

    def __str__(self):
        return self.Name
