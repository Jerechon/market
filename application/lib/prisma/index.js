'use strict';

const { PrismaClient, Prisma } = require('@prisma/client');

/**
 * @see https://www.prisma.io/docs
 */

/**
 * @type {PrismaClient}
 */
const clearPrisma = new PrismaClient();

/**
 * @type {PrismaClient}
 */
const prisma = clearPrisma
  // .$extends({
  //   result: {
  //     userUi: {
  //       showTrialButton: {
  //         needs: {
  //           showTrialButton: true,
  //         },
  //         compute() {
  //           return false;
  //         },
  //       },
  //     },
  //   },
  // })
  .$extends({
    result: {
      file: {
        miniatures: {
          compute(file) {
            if (!file.miniatures) return null;
            for (const size of Object.keys(file.miniatures)) {
              file.miniatures[size] = file.miniatures[size].url;
            }
            return file.miniatures;
          },
        },
      },
    },
  })
  .$extends({
    result: {
      userFiles: {
        file: {
          needs: {
            file: true,
          },
          compute(userFile) {
            return {
              fileId: userFile.file.id,
              url: userFile.file.url,
              miniatures: userFile.file.miniatures,
            };
          },
        },
      },
    },
  })
  .$extends({
    result: {
      user: {
        images: {
          needs: {
            userFiles: true,
          },
          compute(user) {
            return user.userFiles.map(userFile => userFile.file);
          },
        },
      },
    },
  })
  .$extends({
    result: {
      user: {
        places: {
          needs: {
            userPlaces: true,
          },
          compute(user) {
            return user.userPlaces.map(userPlace => userPlace.place);
          },
        },
      },
    },
  })
  .$extends({
    result: {
      user: {
        level: {
          needs: {
            levelType: true,
          },
          compute(user) {
            return user.levelType ?? null;
          },
        },
      },
    },
  })
  .$extends({
    result: {
      match: {
        places: {
          needs: {
            MatchPlaces: true,
          },
          compute(match) {
            if (!match.MatchPlaces) return [];
            return match.MatchPlaces.map(matchPlace => matchPlace.place);
          },
        },
      },
    },
  });

/**
 * @type {PrismaClient}
 */
const xprisma = prisma
  .$extends({
    result: {
      place: {
        images: {
          needs: {
            PlaceFiles: true,
          },
          compute(place) {
            if (place.PlaceFiles.length === 0) return [];

            return place.PlaceFiles.map(image => {
              return {
                fileId: image.fileId,
                url: image.file.url,
                miniatures: image.file.miniatures,
              };
            });
          },
        },
      },
    },
  })
  .$extends({
    result: {
      place: {
        categories: {
          needs: {
            PlaceCategories: true,
          },
          compute(place) {
            if (place.PlaceCategories && place.PlaceCategories.length > 0) {
              return place.PlaceCategories.map(item => {
                return {
                  id: item.category.id,
                  name: item.category.name,
                };
              });
            }

            return [];
          },
        },
      },
    },
  })
  .$extends({
    result: {
      place: {
        contacts: {
          compute(place) {
            if (!place.contacts) {
              place.contacts = {
                site: null,
                phoneNumber: null,
                instagram: null,
              };
            }

            return place.contacts;
          },
        },
      },
    },
  })
  .$extends({
    result: {
      place: {
        isAddedToWishlist: {
          needs: {
            usersWishlist: true,
          },
          compute(place) {
            return place.usersWishlist.length > 0;
          },
        },
      },
    },
  })
  .$extends({
    result: {
      place: {
        usersCount: {
          needs: {
            _count: true,
          },
          compute(place) {
            return place._count.users;
          },
        },
      },
    },
  });

module.exports = { prisma, xprisma, Prisma, clearPrisma };
