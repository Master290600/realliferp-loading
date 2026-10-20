// Runs only during publication. No GitHub API requests or secrets in the player.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
function build(root, output) {
  root = path.resolve(root); output = path.resolve(output);
  if (!output.startsWith(root + path.sep) || output === root) throw Error('Output must be a new directory inside the source root');
  if (fs.existsSync(output)) throw Error('Output directory already exists: ' + output);
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
      if (entry.name.startsWith('.') || entry.name === '_site' || entry.name === 'node_modules') continue;
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (entry.isFile()) files.push(path.relative(root, absolute).split(path.sep).join('/'));
    }
  }
  walk(root);
  // Prefer a real song title over the legacy music.mp3 alias.
  const songs = files.filter(f => /\.mp3$/i.test(f)).sort((a,b) => Number(/(^|\/)music\.mp3$/i.test(a)) - Number(/(^|\/)music\.mp3$/i.test(b)) || a.localeCompare(b, 'en'));
  const seen = new Set(), tracks = [];
  for (const file of songs) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
    if (seen.has(hash)) continue;
    seen.add(hash);
    tracks.push({src:file.split('/').map(encodeURIComponent).join('/') + '?v=' + hash.slice(0,16), title:path.posix.basename(file).replace(/\.mp3$/i,'').replace(/[_]+/g,' ')});
  }
  fs.mkdirSync(output, {recursive:true});
  for (const file of files) {
    if (file === 'build-playlist.cjs' || file === 'playlist.json') continue;
    const target = path.join(output,file); fs.mkdirSync(path.dirname(target), {recursive:true});
    fs.copyFileSync(path.join(root,file), target);
  }
  fs.writeFileSync(path.join(output,'playlist.json'), JSON.stringify({tracks},null,2)+'\n');
  console.log('Playlist: ' + tracks.length + ' unique tracks from ' + songs.length + ' MP3 files');
  return tracks;
}
if (require.main === module) build(process.argv[2] || '.', process.argv[3] || '_site');
module.exports = {build};
