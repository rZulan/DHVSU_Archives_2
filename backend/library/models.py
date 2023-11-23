from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone

class Department(models.Model):
    department_code = models.CharField(
        max_length=10,
        verbose_name='Department Code',
        help_text='Enter the Department Code.',
        null=False
    )
    department = models.CharField(
        max_length=64,
        verbose_name='Department Name',
        help_text='Enter the Department Name.',
        null=False
    )

    def __str__(self):
        return f'{self.department_code} - {self.department}'

class Course(models.Model):
    course_code = models.CharField(
        max_length=10,
        verbose_name='Course Code',
        help_text='Enter the Course Code.',
        null=False
    )
    course = models.CharField(
        max_length=64,
        verbose_name='Course Name',
        help_text='Enter the Course Name.',
        null=False
    )
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.course_code} - {self.course}'

class Author(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    middle_name = models.CharField(max_length=32, null=True, blank=True)
    email = models.CharField(
        max_length=128,
        null=True
    )
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        if self.middle_name:
            return f'{self.first_name} {self.middle_name} {self.last_name}'
        else:
            return f'{self.first_name} {self.last_name}'

class DocumentSection(models.Model):
    section = models.CharField(
        max_length=32,
        verbose_name='Section',
        help_text='Enter a Document Section',
        null=True,
        default='Introduction',
    )
    content = models.TextField(null=True)

    def __str__(self):
        return self.section

class Document(models.Model):
    title = models.CharField(
        max_length=64,
        verbose_name='Title',
        help_text='Enter the Title of the Document.',
        null=False,
    )
    abstract = models.TextField()
    school_year = models.CharField(
        max_length=4,
        verbose_name='School Year',
        help_text='Enter the School Year.',
        null=False,
        default=timezone.now().year,
        validators=[MinLengthValidator(limit_value=4)],
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    authors = models.ManyToManyField(Author)
    sections = models.ManyToManyField(DocumentSection)

    file = models.FileField(upload_to='documents/')

    def __str__(self):
        return self.title