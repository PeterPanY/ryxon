import { Plugin } from 'release-it';
import { execSync } from 'child_process';

class RyxonCliReleasePlugin extends Plugin {
  async beforeRelease() {
    // log an empty line
    console.log('');

    execSync('ryxon-cli build', { stdio: 'inherit' });
    execSync('ryxon-cli changelog', { stdio: 'inherit' });
  }
}

export default RyxonCliReleasePlugin;
