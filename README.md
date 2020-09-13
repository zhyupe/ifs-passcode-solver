[![GitHub issues](https://img.shields.io/github/issues/zhyupe/ifs-passcode-solver)](https://github.com/zhyupe/ifs-passcode-solver/issues)
[![GitHub license](https://img.shields.io/github/license/zhyupe/ifs-passcode-solver)](https://github.com/zhyupe/ifs-passcode-solver/blob/master/LICENSE)

A tool for solving IFS Passcode Challenges.

Visit https://zhyupe.github.io/ifs-passcode-solver/ for instant usage.

### How to use it?

1. Export a portal list from [IITC](https://iitc.me/desktop/). The tool is still under development so it needs some more time before available.
2. Select the generated data file and your image of challenge.
3. Click "Run" and wait several seconds. If it's not working normally, adjust the threshold and try again. 
4. Read the passcode from the drawn paths.

### How does it work?

The tool uses [Image perceptual hash](https://ieeexplore.ieee.org/document/4041692) to compute the similarity between two images. For each image in a column (a set of images in the image of challenge representing a single character), a most simular image of portal would be found, linked and drawn.

### License

AGPL-3.0 © [zhyupe](https://github.com/zhyupe)
