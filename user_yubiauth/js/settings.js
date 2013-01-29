/**
* ownCloud - user_yubiauth
*
* @author Jarkko Lehtoranta
* @copyright 2013 Jarkko Lehtoranta devel@jlranta.com
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
* License as published by the Free Software Foundation; either
* version 3 of the License, or any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU AFFERO GENERAL PUBLIC LICENSE for more details.
*
* You should have received a copy of the GNU Affero General Public
* License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*
*/

$(document).ready(function(){
	$('#yubiauth_submit').click(function(){
		$('#yubiauth_submit').val('Saving...');
		var post = $('#yubiauth').serialize();
		$('#yubiauth_id_error')
			.html('')
			.hide();
		$.post(OC.filePath('user_yubiauth', 'ajax', 'change_settings.php'), post, function(data){
			$('#yubiauth_enabled').prop('checked', (data.data.yubiauth_enabled == 'true'));
			$('#yubiauth_id').val(data.data.yubiauth_id);
			$('#yubiauth_pw_enabled').prop('checked', (data.data.yubiauth_pw_enabled == 'true'));
			$('#yubiauth_pw').val('');
			if (data.data.yubiauth_pw == 'changed') {
				$('#yubiauth_pw').attr('placeholder', 'Password changed');
				setTimeout(function(){$('#yubiauth_pw').attr('placeholder', 'Change password')},1000);
			}
			else if (data.data.yubiauth_pw == 'cleared') {
				$('#yubiauth_pw').attr('placeholder', 'Password cleared');
				setTimeout(function(){$('#yubiauth_pw').attr('placeholder', 'New password')},1000);
			}
			if(data.data.yubiauth_admin_enabled != 'true'){
				$('#yubiauth_urls').val(data.data.yubiauth_urls);
				$('#yubiauth_https').prop('checked', (data.data.yubiauth_https == 'true'));
				$('#yubiauth_check_crt').prop('checked', (data.data.yubiauth_check_crt == 'true'));
				$('#yubiauth_client_id').val(data.data.yubiauth_client_id);
				$('#yubiauth_client_hmac').val(data.data.yubiauth_client_hmac);
				$('#yubiauth_server_settings').show();
			}
			else{
				$('#yubiauth_server_settings').hide();
			}
			if(data.data.yubiauth_id_error != ""){
				$('#yubiauth_id_error')
					.html(data.data.yubiauth_id_error)
					.show();
			}
		});
		setTimeout(function(){$('#yubiauth_submit').val('Save')},1000);
		return false;
	});
});
