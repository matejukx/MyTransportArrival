namespace MyTransportArrival.Services;

using System;
using System.Security.Cryptography;
using System.Text;

public static class PasswordService
{
    public static bool CheckPassword(string password, string hashedPassword, string salt)
    {
        var hashedInput = HashPassword(password, salt);
        return hashedInput == hashedPassword;
    }

    public static (string Hash, string Salt) HashPassword(string password)
    {
        using var hash = SHA256.Create();
        var salt = GenerateSalt();
        var passwordAndSaltBytes = Encoding.UTF8.GetBytes(password + salt);
        var hashBytes = hash.ComputeHash(passwordAndSaltBytes);
        var hashString = Convert.ToBase64String(hashBytes);
        return (hashString, salt);
    }
    
    private static string HashPassword(string password, string salt)
    {
        using var hash = SHA256.Create();
        var passwordAndSaltBytes = Encoding.UTF8.GetBytes(password + salt);
        var hashBytes = hash.ComputeHash(passwordAndSaltBytes);
        return Convert.ToBase64String(hashBytes);
    }
    
    private static string GenerateSalt()
    {
        var salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        return Convert.ToBase64String(salt);
    }
}