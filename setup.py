from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = [line.strip() for line in f if line.strip()]

setup(
    name="erptronix_premium_ui",
    version="0.0.6",
    description="Professional ERPTronix theme for Frappe / ERPNext v15",
    author="Zeeshan",
    author_email="support@example.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
)
