from django.urls import path
from . import views
app_name='apps'


urlpatterns=[
    path('',views.login,name='login'),
    path('index/',views.Index,name='index'),
    path('iot/',views.classs,name='class'),
    path('attendance/',views.attendance_report,name='attendance'),
    path('emotion/',views.Emotion,name='emotion'),
    path('student_stats/',views.Student_Stats,name='students_stats'),
    path('delete',views.Delete,name='delete'),
    path('Bus_Tracking/',views.Bus_Tracking,name='Bus_Tracking'),
    path('live_tracking/',views.Live_Tracking,name='live'),
    path('data/',views.data,name='data'),
    path('stranger/',views.Stranger_Alert,name='stranger'),
    path('AI/',views.Ai,name='Ai'),
    path('Teacher_stats/',views.Teacher_stats,name='Teacher'),


]