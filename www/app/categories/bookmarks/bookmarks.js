angular.module('categories.bookmarks', [
    'categories.bookmarks.create',
    'categories.bookmarks.edit',
    'eggly.models.categories',
    'eggly.models.bookmarks'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks', {
                url: 'categories/:category',
                //target the named 'ui-view' in ROOT (eggly) state named 'bookmarks'
                //to show bookmarks for a specific category
                views: {
                    'bookmarks@': {
                        templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
                        controller: 'BookmarksListCtrl as bookmarksListCtrl'
                    }
                }
            })
        ;
    })
    .controller('BookmarksListCtrl', function ($state, $stateParams, CategoriesModel, BookmarksModel) {
        var bookmarksListCtrl = this;

        bookmarksListCtrl.isEditMode = false;
        bookmarksListCtrl.title = $stateParams.category || 'Bookmarks'
        CategoriesModel.setCurrentCategory($stateParams.category);

        BookmarksModel.getBookmarks()
            .then(function (bookmarks) {
                bookmarksListCtrl.bookmarks = bookmarks;
            });

        bookmarksListCtrl.toggleEditMode = function toggleEditMode() {
          bookmarksListCtrl.isEditMode = !bookmarksListCtrl.isEditMode;
        }
        bookmarksListCtrl.goToUrl = function getToUrl(bookmark) {
          bookmarksListCtrl.isEditMode
            ? $state.go('eggly.categories.bookmarks.edit', {bookmarkId: bookmark.id, category: bookmark.category})
            : window.open(bookmark.url, '_system');
        }
        bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        bookmarksListCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
    })

;

