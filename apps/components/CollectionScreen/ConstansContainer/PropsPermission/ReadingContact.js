import { PermissionsAndroid } from 'react-native'

export async function ReadingContact() {
	PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
		{
			'title': 'Contacts',
			'message': 'This app would like to view your contacts.'
		}
		)
}