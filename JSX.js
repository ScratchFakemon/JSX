class JsRunnerExtension {
  getInfo() {
    return {
      id: 'jsrunner',
      name: 'JavaScript Runner',
      blocks: [
        {
          opcode: 'runJs',
          blockType: Scratch.BlockType.COMMAND,
          text: 'run JavaScript [CODE]',
          arguments: {
            CODE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'console.log("Hello, World!");',
            },
          },
        },
      ],
    };
  }

  runJs(args) {
    const code = args.CODE;

    // Wrap the code in a function to avoid unintended side effects
    const wrappedCode = `(function() { ${code} })();`;

    try {
      // Evaluate the wrapped code in a sandboxed environment (consider security implications for untrusted code)
      eval(wrappedCode);

      // No return value for command blocks
    } catch (error) {
      // Handle errors during execution
      console.error('Error running JavaScript:', error);
      // Display an error message in the Scratch console
      Scratch.extensions.broadcast('JS_Runner_Error', error.message);
    }
  }
}

Scratch.extensions.register(new JsRunnerExtension());
