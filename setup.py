from setuptools import setup, find_packages
from pathlib import Path

with open('requirements.txt') as f:
    install_requires = [r for r in f.read().splitlines() if r.strip()]

setup(
    name='erptronix_premium_ui',
    version='0.0.2',
    description='Premium colorful UI theme for ERPNext / Frappe v15',
    author='OpenAI',
    author_email='support@example.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
    long_description=Path('README.md').read_text(encoding='utf-8'),
    long_description_content_type='text/markdown',
)
