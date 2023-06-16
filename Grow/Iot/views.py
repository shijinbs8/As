

import openai
from django.contrib import messages
from django.shortcuts import render, redirect
from .models import Student,Bus_Students,Students
from django.http import JsonResponse
from random import choice, random
import openai
import base64
import os
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Set the backend to a non-interactive one
import matplotlib.pyplot as plt
from django.shortcuts import render
from django.conf import settings


# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Perform authentication logic here (e.g., check against database)
        # For simplicity, let's assume username is "admin" and password is "password"
        if username == 'admin' and password == '1234':
            request.session['username'] = username
            return redirect('index/')
        else:

            return render(request, 'login.html')

    return render(request, 'login.html')
def Index(request):
    return render(request,'index.html')

def classs(request):
    return render(request,'class1.html')

class StudentInfo:
    def __init__(self, name, class_name, roll_number):
        self.name = name
        self.class_name = class_name
        self.roll_number = roll_number
def attendance_report(request):
    if request.method == 'POST':
        date = request.POST.get('date')

        # Generate random attendance for each student
        attendance = []
        for student in Student.objects.all():
            status = choice(['Present', 'Absent'])
            student_info = StudentInfo(student.name, student.class_name, student.roll_number)
            attendance.append((student.name, status, student_info))

        return render(request, 'report.html', {'date': date, 'attendance': attendance})

    return render(request, 'attendence.html')
def Student_Stats(request):
    if request.method == 'POST':
        Name = request.POST['Name']
        Reg_No = request.POST['Reg_No']
        student = Students(Name=Name,Reg_No=Reg_No)
        student.save()
    data = Students.objects.all()
    return render(request,'student_stats.html',{'data':data})
def Delete(request):
    d=Students.objects.all()
    d.delete()
    return redirect('/student_stats')
def Bus_Tracking(request):
    sts=Bus_Students.objects.all()
    return render(request,'Bus_Tracking.html',{'sts':sts})
def Live_Tracking(request):
    return render(request,'Live_Tracking.html')
def data(request):
    x = list(range(1, 11))
    y = [random.randint(1, 10) for _ in x]

    # Return the data as JSON
    return JsonResponse({'x': x, 'y': y})
def Stranger_Alert(request):
    return render(request,'Stranger.html')

openai.api_key = "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"  # Your OpenAI API key

messages = []

def Ai(request):
    if request.method == 'POST':
        text = request.POST.get('user_input')
        print("User input:", text)

        # Perform OpenAI chat completion
        output = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"{text} in 50 words"}]
        )
        response = output['choices'][0]['message']['content']
        print("Response:", response)

        messages.append({"role": "user", "content": text})
        messages.append({"role": "bot", "content": response})

    return render(request, 'Ai_Teacher.html', {'messages': messages})
def Teacher_stats(request):
    return render(request,'Teacher_stats.html')

classes = [str(i) for i in range(1, 6)]  # ['1', '2', '3', '4', '5']
divisions = ['A', 'B', 'C']
students = [str(i) for i in range(1, 21)]  # ['1', '2', '3', ..., '19', '20']

attendance = {}
selected_class = None
selected_division = None
selected_date = None

def Att(request):
    global selected_class, selected_division, selected_date, attendance

    if request.method == 'POST':
        # Get the selected values from the form
        selected_date = request.POST['attendanceDate']
        selected_class = request.POST['class']
        selected_division = request.POST['division']

        # Update the attendance dictionary
        attendance.setdefault(selected_class, {})
        attendance[selected_class].setdefault(selected_division, {})

        # Randomly set students as present or absent
        for student in students:
            is_present = random.choice([True, False])
            attendance[selected_class][selected_division][student] = is_present

    return render(request, '.html', {
        'classes': classes,
        'divisions': divisions,
        'attendance': attendance,
        'selected_class': selected_class,
        'selected_division': selected_division,
        'selected_date': selected_date
    })



CSV_FOLDER = os.path.join(settings.BASE_DIR, 'csv')  # Updated folder path


# Function to choose a CSV file from a folder
def choose_csv_file():
    files = os.listdir(CSV_FOLDER)
    csv_files = [file for file in files if file.endswith('.csv')]

    return csv_files


# Function to generate pie charts from a CSV file
def generate_charts(csv_file):
    csv_path = os.path.join(CSV_FOLDER, csv_file)

    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_path)

    # Convert the 'Time' column to a datetime object
    df['Time'] = pd.to_datetime(df['Time'])

    # Create a new column for the focus level based on the emotions
    df['Focus'] = df['Emotion'].apply(lambda x: 'Focused' if x in ['Neutral', 'Happy', 'Surprise'] else 'Not Focused')
    print('helo')
    # Create a figure with four subplots
    fig, axes = plt.subplots(2, 2, figsize=(12, 12))

    # Plot the first chart for total emotions
    counts = df.groupby('Emotion')['Image Name'].count().sort_index()
    axes[0, 0].pie(counts.values, labels=counts.index, autopct='%1.1f%%')
    axes[0, 0].set_title('Total Emotions')
    axes[0, 0].set_aspect('equal')
    axes[0, 0].axis('off')
    axes[0, 0].legend(title='Emotion', loc='center')

    # Plot the second chart for not focused emotions
    not_focused_df = df[~df['Emotion'].isin(['Neutral', 'Happy', 'Surprise'])]
    total_not_focused = not_focused_df.shape[0]
    counts = not_focused_df.groupby('Emotion')['Image Name'].count()
    percentages = counts / total_not_focused * 100
    axes[0, 1].pie(percentages.values, labels=percentages.index, autopct='%1.1f%%')
    axes[0, 1].set_title('Not Focused Emotions')
    axes[0, 1].set_aspect('equal')
    axes[0, 1].axis('off')
    axes[0, 1].legend(title='Emotion', loc='center')

    # Plot the third chart for focus level
    counts = df.groupby('Focus')['Image Name'].count()
    axes[1, 0].pie(counts.values, labels=counts.index, autopct='%1.1f%%')
    axes[1, 0].set_title('Focus Level')
    axes[1, 0].set_aspect('equal')
    axes[1, 0].axis('off')
    axes[1, 0].legend(title='Focus', loc='center')

    # Plot the fourth chart for focused emotions
    focused_df = df[df['Emotion'].isin(['Neutral', 'Happy', 'Surprise'])]
    total_focused = focused_df.shape[0]
    counts = focused_df.groupby('Emotion')['Image Name'].count()
    percentages = counts / total_focused * 100
    axes[1, 1].pie(percentages.values, labels=percentages.index, autopct='%1.1f%%')
    axes[1, 1].set_title('Focused Emotions')
    axes[1, 1].set_aspect('equal')
    axes[1, 1].axis('off')
    axes[1, 1].legend(title='Emotion', loc='center')

    # Adjust spacing between subplots
    plt.tight_layout()

    # Save the plot to a temporary file
    print('helo1')
    temp_file = os.path.join(settings.STATIC_ROOT, 'temp_plot.png')
    plt.savefig(temp_file)

    # Read the temporary file as bytes and encode it as base64
    with open(temp_file, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    # Close the plot
    plt.close()
    print('final')

    return encoded_string
def Emotion(request):
    csv_files = choose_csv_file()

    if request.method == 'POST':
        csv_file = request.POST.get('csv_file')

        if csv_file:
            plot_image = generate_charts(csv_file)
            return render(request, 'emotion.html', {'csv_files': csv_files, 'plot_image': plot_image})

    return render(request, 'emotion.html', {'csv_files': csv_files})

