import figlet from 'figlet';
import ansi from 'ansi';

export function printLogo() {
  let cursor = ansi(process.stdout);

  cursor
    .bg.black()
    .bold()
    .green().write('>')
    .white().write('boot')
    .resetBold()
    .bg.green()
    .black().write('env')
    .reset().write('\n');
}

export function printBanner() {
  console.log('');

  let bootenv = ' '.repeat(80) + '\n' +
    figlet.textSync('>bootenv', { font: 'DOS Rebel' }).replace(/\n *$/, '');
  let cursor = ansi(process.stdout);
  let regExp = /(.{10})(.*)(.{32})\n/g;

  let match;
  while (match = regExp.exec(bootenv)) { // jshint ignore:line
    cursor
      .bg.black()
      .green().write(' ' + match[1])
      .white().write(match[2] + ' ')
      .bg.green()
      .black().write(match[3] + ' ')
      .reset().write('\n');
  }

  console.log(figlet.textSync(' '.repeat(8) + 'Rest API', { font: 'JS Stick Letters' }));

  console.log('');
}

