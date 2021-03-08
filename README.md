# node-git-watch

This is a CLI tool that watches for changes in a repo to automatically commit and push up to your git remote repository.

## How to use

You can clone this repo and run `npm link` inside of the repo.

From there, you can call `node-git-watch` from the repo you wish to watch, using the following argument options to tailor the script.

## Arguments

### `-t [number=60000]`

The amount of time between intervals when the script will check for changes. If using this flag, the value you pass in should be in milliseconds. It defaults to 10 minutes.

### `-f [string="y-MM-dd HH:mm:ss"]`

The format that the commit timestamp will take after. The format must be readable by [date-fns](https://date-fns.org/v2.19.0/docs/format). The default value and commit message looks like this.

```sh
Commit (2021-02-28 18:02:01)
```
