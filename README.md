# Frida-Forsaken

> Frida Forsaken is a Frida agent written in TypeScript, designed to modularize commonly used functions in daily work

## Usage

### compile & load

```bash
git clone git@github.com:azwpayne/frida-forsaken.git
cd frida-forsaken
npm i -g yarn # If you haven't installed yarn, please run it to install
yarn install  # Install dependencies
```

### Inject

```bash
# spwn
frida -Ul src_agent.js -f package_name

# attach
frida -UFl src_agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```bash
npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.

## Reference&Thanks

| Author    | repo |    category |
| -------- | ------- | -------  |
| oleavr  | [frida-agent-example](https://github.com/oleavr/frida-agent-example)    |comprehensive    |
| CreditTone | [hooker](https://github.com/CreditTone/hooker)     |comprehensive    |
| pcipolloni    | [universal-android-ssl-pinning-bypass-with-frida](https://codeshare.frida.re/@pcipolloni/universal-android-ssl-pinning-bypass-with-frida/)    |capture    |
| r0ysue    | [r0capture](https://github.com/r0ysue/r0capture)    |capture    |
| WooyunDota    | [DroidSSLUnpinning](https://github.com/WooyunDota/DroidSSLUnpinning)    |capture    |
| akabe1    | [frida-multiple-unpinning](https://codeshare.frida.re/@akabe1/frida-multiple-unpinning/)    |capture    |
| dzonerzy    | [fridantiroot](https://codeshare.frida.re/@dzonerzy/fridantiroot/)    |bypass_anti    |
| lasting-yang    | [frida_hook_libart](https://github.com/lasting-yang/frida_hook_libart)   |hook art    |
