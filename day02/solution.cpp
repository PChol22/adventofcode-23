#include <fstream>
#include <iostream>
#include <string>
#include <vector>

void firstProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];

        for (int k = 0; k < line.length(); k++)
        {
            if (line[k] == ',')
            {
                line.replace(k, 1, ";");
            }
        }

        std::string startDelimiter = ": ";
        std::string ballsDelimiter = "; ";

        line.erase(0, line.find(startDelimiter) + startDelimiter.length());

        std::vector<std::string> balls;
        size_t pos = 0;

        while ((pos = line.find(ballsDelimiter)) != std::string::npos)
        {
            balls.push_back(line.substr(0, pos));
            line.erase(0, pos + ballsDelimiter.length());
        }

        balls.push_back(line);

        bool ok = true;

        for (int j = 0; j < balls.size(); j++)
        {
            std::string ballDelimiter = " ";

            std::string amount = balls[j].substr(0, balls[j].find(ballDelimiter));
            balls[j].erase(0, balls[j].find(ballDelimiter) + ballDelimiter.length());

            std::string color = balls[j];

            if (color == "red" && std::stoi(amount) > 12)
            {
                ok = false;
            }
            if (color == "green" && std::stoi(amount) > 13)
            {
                ok = false;
            }
            if (color == "blue" && std::stoi(amount) > 14)
            {
                ok = false;
            }
        }

        if (ok)
        {
            solution += (i + 1);
        }
    }

    std::cout << solution << std::endl;
}

void secondProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];

        for (int k = 0; k < line.length(); k++)
        {
            if (line[k] == ',')
            {
                line.replace(k, 1, ";");
            }
        }

        std::string startDelimiter = ": ";
        std::string ballsDelimiter = "; ";

        line.erase(0, line.find(startDelimiter) + startDelimiter.length());

        std::vector<std::string> balls;
        size_t pos = 0;

        while ((pos = line.find(ballsDelimiter)) != std::string::npos)
        {
            balls.push_back(line.substr(0, pos));
            line.erase(0, pos + ballsDelimiter.length());
        }

        balls.push_back(line);

        int red = 0;
        int green = 0;
        int blue = 0;

        for (int j = 0; j < balls.size(); j++)
        {
            std::string ballDelimiter = " ";

            std::string amount = balls[j].substr(0, balls[j].find(ballDelimiter));
            balls[j].erase(0, balls[j].find(ballDelimiter) + ballDelimiter.length());

            std::string color = balls[j];

            if (std::stoi(amount) > red && color == "red")
            {
                red = std::stoi(amount);
            }
            if (std::stoi(amount) > green && color == "green")
            {
                green = std::stoi(amount);
            }
            if (std::stoi(amount) > blue && color == "blue")
            {
                blue = std::stoi(amount);
            }
        }

        solution += (red * green * blue);
    }

    std::cout << solution << std::endl;
}

int main()
{
    std::ifstream myFile;

    myFile.open("input.txt");

    if (!myFile.is_open())
    {
        std::cout << "Unable to open file" << std::endl;
        return 1;
    }

    std::string line;
    std::vector<std::string> lines;

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            break;
        }

        lines.push_back(line);
    }

    firstProblem(lines);
    secondProblem(lines);

    return 0;
}
