---
title: App-wide CLI Configuration in Python
date: 2023-09-05
tags:
  - post
---

Recently I had the situation where I had a Python-based program to be used in a command line interface (CLI). But the program had many configuration options and I wanted a flexible way to deal with defaults and overriding them, while changing as little code as possible. I didn't find great results on Google's first page, so I thought I write it up here.

The problem with a reasonably large Python program, where code is distributed into several modules, is that we cannot really just pass a `config` dictionary around. There are too many functions, and it's really annoying. So the first improvement is to export the configuration from variables in a `config` module. That's better, but now we have to change the source code every time we want to change the program's configuration. Not ideal. But there's a somewhat neat solution with Python built-ins.

Python has a [configparser](https://docs.python.org/3/library/configparser.html), which reads `.ini`-style configuration files. It supports sections, keys and rather simplistic values (strings, ints, and such), which is enough for me. Of course you can exchange that to a JSON config file (`json` built-in) or to YAML (3rd party libraries), it doesn't really matter as long as it reads configuration from a file. In that file, `config.ini`, we write all the defaults.

```
[SECTION]
CONFIG_OPTION1 = foo
CONFIG_OPTION2 = bar
```

The next step is to read those defaults and distribute them within the program. We follow the previously mentioned `config` module approach. In the `config.py` file, we read the defaults from `config.ini` and set a `ContextVar` for each configuration option. [`contextvars`](https://peps.python.org/pep-0567/) is a built-in Python module for "Context Variables". Basically, you can reference a variable and its value is set by the context around it (e.g., a thread). (Not to be confused with `click`'s [`context`](https://click.palletsprojects.com/en/8.1.x/commands/#nested-handling-and-contexts)!) This approach will allow us to override the defaults in a single place, which we will come to later. The `config` module looks more or less like this:

```python
import configparser
from contextvars import ContextVar

config = configparser.ConfigParser()
config.read("config.ini")

CONFIG_OPTION1 = ContextVar("CONFIG_OPTION1", default = config.get('SECTION', 'CONFIG_OPTION1'))
CONFIG_OPTION2 = ContextVar("CONFIG_OPTION2", default = config.get('SECTION', 'CONFIG_OPTION2'))
# and so on
```

Since the program is to be used in a CLI, we use [click](https://click.palletsprojects.com/en/8.1.x/) for argument parsing and validation. Now it would be really neat if we could override the defaults from the configuration file with CLI arguments. And this is really easy thanks to `contextvars`:

```python
import contextvars
from util.config import CONFIG_OPTION1, CONFIG_OPTION2

def the_actual_function_to_run():
  # some code using CONFIG_OPTION1 and CONFIG_OPTION2
  pass


@click.command()
@click.option("--config-option1", default="some-default", help="first config option")
@click.option("--config-option2", default="other-default", help="second config option")
def main(
    config_option1,
    config_option2,
):
    # override defaults in configuration file
    CONFIG_OPTION1.set(config_option1)
    CONFIG_OPTION2.set(config_option2)

    # call the whole program using those values
    ctx = contextvars.copy_context()
    ctx.run(the_actual_function_to_run)
```

 Of course, there are some odd ends and possible improvements. For instance, the `click` defaults have precendence over the `config.ini` defaults, which is not ideal as they can get out of sync over time. I assume in many situations one could not use `click` defaults at all and only override the `config.ini` defaults if the respective CLI argument was provided. Then there's a lot of typing in `config.py` if there are a lot of configuration options, but one could get rid of these by assembling a `dict` dynamically from the sections and keys available in the configuration file.

 But the important advantage of the whole thing is that we set those options once in the beginning, and their values are distributed to _every other piece of code_ we wrote, no matter how deep in the callstack it is (as long as it uses the context variables from the `config` module).
