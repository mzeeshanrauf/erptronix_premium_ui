from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

from pathlib import Path
long_description = Path("README.md").read_text(encoding="utf-8")

setup(
    name="erptronix_premium_ui",
    version="0.0.1",
    description="Premium colorful UI theme for ERPNext / Frappe v15",
    author="OpenAI",
    author_email="support@example.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
    long_description=long_description,
    long_description_content_type="text/markdown",
)
