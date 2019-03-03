<?php 
ini_set('display_errors',0);

switch ($_GET['request']) {
	case 'search':
		require_once('search_post.php');
		break;

	case 'getTags':
		require_once('return_tags.php');
		break;

	case 'getComments':
		require_once('return_comments.php');
		break;

	case 'getSteps':
		require_once('return_steps.php');
		break;

	case 'getPost':
		require_once('return_post.php');
		break;
	
	case 'getPostCardsByTag':
		require_once('search_tags.php');
		break;

	case 'getPostCards':
		require_once('return_post_card.php');
		break;

	case 'getCategoryCards':
		require_once('return_category.php');
		break;

	case 'getRecentPostCards':
		require_once('return_recent_post_cards.php');
		break;

	case 'getTopPostCards':
		require_once('return_top_post_cards.php');
		break;

	case 'getUserPosts':
		require_once('return_user_posts.php');
		break;

	case 'editUser':
		require_once('edit_user.php');
		break;

	case 'getUserCards':
		require_once('return_user_card.php');
		break;

	case 'getTopUserCards':
		require_once('return_top_users.php');
		break;

	case 'getUser':
		require_once('return_user.php');
		break;

	case 'getLanguage':
		require_once('return_language.php');
		break;

	case 'authorize':
		require_once('auth.php');
		break;

	case 'adminAction':
		require_once('admin_actions.php');
		break;

	case 'uploadPost':
		require_once('upload_post.php');
		break;

	case 'deletePost':
		require_once('delete_post.php');
		break;

	case 'editPost':
		require_once('edit_post.php');
		break;

	case 'checkStars':
		require_once('check_stars.php');
		break;

	case 'updateStars':
		require_once('update_stars.php');
		break;

	case 'updateLikes':
		require_once('update_likes.php');
		break;

	case 'addComment':
		require_once('add_comment.php');
		break;

	case 'register':
		require_once('register.php');
		break;

	default:
		exit();
		break;
}

?>