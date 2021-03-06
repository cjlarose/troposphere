# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-09-28 16:24
from __future__ import unicode_literals

import django.contrib.auth.models
import django.core.validators
from django.db import migrations, models
from django.db.utils import ProgrammingError
import django.utils.timezone
import uuid


def migrate_accounts(apps, schema_editor):
    TroposphereUser = apps.get_model("troposphere", "TroposphereUser")
    DjangoUser = apps.get_model("auth", "User")
    table_names = schema_editor.connection.introspection.table_names()
    if 'auth_user' not in table_names:
        return None
    # This is only required for accounts that have an `auth_user` created already.
    # New databases will not have `auth_user` and rely only on `troposphere_user`.
    all_old_users = DjangoUser._default_manager.all().order_by('id')
    for old_user in all_old_users:
        TroposphereUser.objects.create(
            username=old_user.username,
            password=old_user.password,
            email=old_user.email,
            first_name=old_user.first_name,
            last_name=old_user.last_name,
            is_staff=old_user.is_staff,
            is_superuser=old_user.is_superuser,
            date_joined=old_user.date_joined,
            last_login=old_user.last_login,
        )


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
    ]

    operations = [
        migrations.CreateModel(
            name='TroposphereUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('username', models.CharField(error_messages={b'unique': 'A user with that username already exists.'}, help_text='Required. 256 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=256, unique=True, validators=[django.core.validators.RegexValidator(b'^[\\w.@+-]+$', 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.')], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=64, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=256, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'troposphere_user',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RunPython(
            migrate_accounts, None
        ),
    ]
