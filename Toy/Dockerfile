FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  && apt-get install -y python3.7-dev python3-pip libpq-dev curl \
  && apt-get clean all \
  && rm -rf /var/lib/apt/lists/*

ENV LANG en_US.utf8

WORKDIR /home/Toy

COPY ./requirements.txt ./
RUN pip3 install -r requirements.txt

COPY ./ ./

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
