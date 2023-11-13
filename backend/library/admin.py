from django.contrib import admin
from .models import Department, Course, Author, DocumentSection, Document

admin.site.register(Department)
admin.site.register(Course)
admin.site.register(Author)
admin.site.register(DocumentSection)
admin.site.register(Document)
